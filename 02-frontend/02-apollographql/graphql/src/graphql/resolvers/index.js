import { mergeResolvers } from 'merge-graphql-schemas';
import projectResolver from './project';

const resolvers = [projectResolver];

export default mergeResolvers(resolvers);