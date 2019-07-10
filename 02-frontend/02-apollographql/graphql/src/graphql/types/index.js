import { mergeTypes } from 'merge-graphql-schemas';

import util from './util.graphql';
import project from './project.graphql';

export default mergeTypes(
    [util, project],
    { all: true },
);