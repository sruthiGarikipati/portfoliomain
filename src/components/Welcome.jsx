import React, { useState, useEffect } from 'react';
import { auth, db } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth'; // Import signOut

const Welcome = () => {
    const [user, setUser] = useState(null);
    const [photoURL, setPhotoURL] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                try {
                    const userDocRef = doc(db, 'users', currentUser.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setPhotoURL(data.photoURL || 'https://via.placeholder.com/150');
                    } else {
                        setPhotoURL('https://via.placeholder.com/150'); // Fallback
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setPhotoURL('https://via.placeholder.com/150'); // Fallback
                }
                setLoading(false);
            } else {
                navigate('/');
            }
        });
  
        return () => unsubscribe();
    }, [navigate]);
  
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/'); // Redirect to the home page
        } catch (error) {
            console.error('Logout error:', error.message);
        }
    };
  
    if (loading) {
        return <p>Loading...</p>;
    }
  
    return (
        <div className="welcome" style={{ textAlign: 'center', padding: '20px', color: 'white' }}>
            <h1>Good to See You {user.displayName || 'User'}!</h1>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100px',
                    width: '100px',
                    margin: '0 auto',
                    borderRadius: '50%',
                    overflow: 'hidden',
                }}
            >
                <img
                    src={photoURL}
                    alt="Profile"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>
            <button 
                onClick={handleLogout} 
                style={{
                    marginTop: '80px',
                    
                    backgroundColor: 'white', // White background
                    color: 'black', // Black text
                    border: 'none',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // Optional shadow for better visibility
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default Welcome;



