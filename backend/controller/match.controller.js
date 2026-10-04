import MatchReq from "../models/matchReq.model" 
import Match from "../models/match.model"
import User from "../models/user.model"


 const findMatch = async (req, res) => {
    const userId = req.userId
    const { languages } = req.body

    try {
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

        //Creating a MatchReq for user 
        const newMatchReq = new MatchReq({
            userId: userId,
            languages: verifiedLanguagesForMatch,
            status: "searching"
        })

        await newMatchReq.save()

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
        }

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
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
 }


 export { findMatch, matchClear, matchReqClear }