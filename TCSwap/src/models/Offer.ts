import DBCard from "./DBCard";

export default interface Offer{
    id: number,
    requestor: string,
    decider: string,
    status:'accepted'|'rejected'|'pending',
    requestorCards: DBCard[],
    deciderCards: DBCard[],
};