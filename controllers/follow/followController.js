const controllers = {
    followQuestionAnswer: async (req, res) => {
        try {
        } catch (error) {
            console.error(error);
            return errorResponse(res, {}, "something went wrong!");
        }
    },
};

module.exports = controllers;
