import { addDoc, collection } from "firebase/firestore";

const SCORES_COLLECTION = 'scores';

export function addHighScore(uid, highScore) {
    addDoc(collection(db, SCORES_COLLECTION), {uid, highScore});
}