import { addDoc, getDoc, setDoc, doc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function updateDataFromFirestore(userId, winTally) {
    try {
        const docRef = doc(db, "users", userId);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const userHighScore = userData.highScore || 0;
            // Compare user's high score with current game's high score
            if (winTally > userHighScore) {
                saveDataToFireStore(userId, winTally);
            }
        } else {
            // User document does not exist, create a new document
            await setDoc(docRef, { username: username, highScore: 0 }); // Initialize high score to 0 or any default value
            console.log("New user document created for userId:", userId);
        }
    } catch (error) {
        console.error("Error fetching user's data:", error);
    }
};

export async function saveDataToFireStore(userId, winTally) {
    try {
        const docRef = doc(db, "users", userId);
        await setDoc(docRef, {
            highScore: winTally
        }, { merge: true });
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export async function getUserHighScoreFromFirestore(userId) {
    try {
        const docRef = doc(db, "users", userId);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const userHighScore = userData.highScore || 0;
            return userHighScore;
        } else {
            return 0;
        }
    } catch (error) {
        console.error("Error fetching user's high score:", error);
    }
}

export async function addDocToFirestore(username, userId) {
    console.log("user inside addDoctToFirestore: ", username, userId);
    try {
        const docRef = doc(db, "users", userId);
        await setDoc(docRef, { username: username, highScore: 0 })
        console.log("New user document created for username:", username);
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
};