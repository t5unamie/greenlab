export default {
    Query: {
        projects: async (source, args, { dataSources }, state) => {
            return dataSources.projectSource.getForproject(source.url);
        },
        project: async (source, args, { dataSources }, state) => {
            // by using "args" argument we can get access
            // to query arguments
            const { url } = args;

            const result = dataSources.projectSource.get([url]);
            if (result && result[0]) {
                return result[0];
            }

            return null;
        },
    },

    Mutation: {
        putProject: async (source, args, { dataSources }, state) => {
            const { data } = args;

            let result = {};
            try {
                await dataSources.projectSource.put(data);
            } catch(e) {
                console.log(e);
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
                console.log(e);
                result.error = 'Internal error';
            }

            return result;
        },
    }
};
