"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `#graphql
    updateAgencyFormStatus(id:ID,status:ApplicationStatus):Response,
    createEvent(data:EventInput):Response,
`;
