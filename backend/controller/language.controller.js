import { Languages } from "../consts/language.js";
import User from "../models/user.model.js";

const getLanguages = async (req, res) => {
  try {
    return res.status(200).json({ languages: Languages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserLanguages = async (req, res) => {
  const userId = req.userId;
  const { addedLanguages, removedLanguages } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (
      (addedLanguages && addedLanguages.length > 0) ||
      (removedLanguages && removedLanguages.length > 0)
    ) {
      await User.findByIdAndUpdate(req.userId, {
        $pull: {
          languages: { $in: removedLanguages },
        },
      });

      await User.findByIdAndUpdate(req.userId, {
        $addToSet: {
          languages: { $each: addedLanguages },
        },
      });
    }

    const updatedUserLanguages = await User.findById(req.userId)

    return res.status(200).json({
      message: "User languages updated successfully",
      languages: updatedUserLanguages.languages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getLanguages, updateUserLanguages };
