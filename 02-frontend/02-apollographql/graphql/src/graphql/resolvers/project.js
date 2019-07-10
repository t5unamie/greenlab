export default {
    Mutation: {
        putProject: async (source, args, { dataSources }, state) => {
            const { data } = args;

            let result = {};
            try {
                await dataSources.projectSource.put(data);
            } catch(e) {
                console.error(e);
                result.error = 'Internal error';
            }

            return result;
        },
        deleteProject: async (source, args, { dataSources }, state) => {
            const { title } = args;

            let result = {};
            try {
                await dataSources.projectSource.delete(title);
            } catch(e) {
                console.error(e);
                result.error = 'Internal error';
            }

            return result;
        },
    },
};