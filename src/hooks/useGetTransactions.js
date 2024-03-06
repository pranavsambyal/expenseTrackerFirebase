import { query, collection, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase-config'
import { useGetUserInfo } from './useGetUserInfo'
import { useEffect, useState } from 'react';

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState({ balance: 0, tincome: 0, texpenses: 0 })
  const { userID } = useGetUserInfo();
  const transactionCollectionRef = collection(db, "transactions");
  const getTransactions = async () => {
    let unsubscribe;
    try {
      const queryTransactions = query(transactionCollectionRef, where("userID", "==", userID), orderBy("createdAt"));

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let tincome = 0;
        let texpenses = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.transactionType === "expense") {
            texpenses += parseFloat(data.transactionAmount);
          }
          else {
            tincome += parseFloat(data.transactionAmount);
          }
          const id = doc.id
          docs.push({ ...data, id });
        });
        setTransactions(docs);
        setTotal({ balance: tincome - texpenses, tincome, texpenses })
      })
    }
    catch (err) {
      console.error(err);
    }
    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, [])
  return { transactions, total };
};