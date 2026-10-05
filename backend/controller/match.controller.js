import MatchReq from "../models/matchReq.model.js" 
import Match from "../models/match.model.js"
import User from "../models/user.model.js"


 const findMatch = async (req, res) => {
    const userId = req.userId
    const { languages } = req.body

    try {
        //Deleting this later if found Other solution
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    

        //Writing comments cuz its too confusing for me too !
        const user = await User.findById(userId)

        //Checking if The Languages sended by frontend are valid and user have them in their db
        const verifiedLanguagesForMatch = user.languages.filter(language => languages.includes(language))

        //If the user have 1 or more lang
        if(verifiedLanguagesForMatch.length == 0) {
            return res.status(400).json({ message: "No matching language found | Try again" })
        }

        //Checking user already in match or not 
        const userMatchReqStatus = await MatchReq.findOne({userId})

        if(userMatchReqStatus  && userMatchReqStatus.status == "matched") {
            return res.status(400).json({ message: "You are already in a match" })
        }

        //Checking if User had match and they ended session so their old MatchReq is still in db so using it again
        const existingMatchReq = await MatchReq.findOne({userId})

        if(existingMatchReq) {
            existingMatchReq.languages = verifiedLanguagesForMatch
            existingMatchReq.status = "searching"
            await existingMatchReq.save()
        } else {
            //Creating a MatchReq for user 
            const newMatchReq = new MatchReq({
                userId: userId,
                languages: verifiedLanguagesForMatch,
                status: "searching"
            })
            await newMatchReq.save()
        }



        
        
        //Deleting this later if found Other solution
        const startTime = Date.now()

        while (Date.now() - startTime < 3 * 60 * 1000) {
            //Checking after every 3 seconds if there is a mate for the current user other wise the api will not respond for 3 min 
            const currentMatchReq= await MatchReq.findOne({userId})
            
            //returning if the user found the mate
            if(currentMatchReq.status == "matched") {
                return res.status(200).json({ message: "Your mate has been found"})
            }
            
            
        //Finding a mate for the current user

        //But i have not figured out how to wait if there is no current mate for match i need to read docs and Web for soln later 
        const matchedUser = await MatchReq.findOne({
            userId: { $ne: userId},
            languages: { $in: verifiedLanguagesForMatch },
            status: "searching"
        })

        if(matchedUser) {
            //Intersection of both users languages
            const commonLanguages = verifiedLanguagesForMatch.filter(language => matchedUser.languages.includes(language))


           //Deciding 1 common language for both users for the match
        
           const oneRandomCommonLanguage = commonLanguages[Math.floor(Math.random() * commonLanguages.length)]

           //Creating a Match for both users
           const newMatch = new Match({
                 users: [userId, matchedUser.userId],
                 language: oneRandomCommonLanguage,
           })

              await newMatch.save()

              //Updating the status of both users to matched
              await MatchReq.updateOne({userId: userId}, {status: "matched"})
              await MatchReq.updateOne({userId: matchedUser.userId}, {status: "matched"})
              return res.status(200).json({ message: "Your mate has been found"})
        }

             //Delteting this later when i find other solution 
             await wait(3000)
    }


        return res.status(200).json({ message: "No mate found for now | Please wait"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }

 }


 
 const matchClear = async (req, res) => {
    const userId = req.userId

    try {
        //Deleting the Match after the session end 
        const matchReq = await MatchReq.findOne({userId})
        if(matchReq.status == "matched") {
            const match = await Match.findOne({users: userId})
           const userIds = match.users

           await MatchReq.updateMany({userId: {$in: userIds}}, {status: "searching"})
           await Match.deleteOne({users: userId})
        }

        return res.status(200).json({ message: "Call ended | Finding new mate"})


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
 }


 const matchReqClear = async (req, res) => {
    const userId = req.userId
    try {
        await MatchReq.deleteOne({userId})

        const currentMatch = await Match.findOne({users: userId})
        if(currentMatch) {
            await Match.deleteOne({users: userId})
        }

        return res.status(200).json({message: "Searching stopped"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
 }


 export { findMatch, matchClear, matchReqClear }