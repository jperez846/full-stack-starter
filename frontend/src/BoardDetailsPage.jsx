import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardDetailsPage.css';


const BoardDetailPage = () => {
    const { id } = useParams();
    const [board, setBoard] = useState(null);
    const [showCardModal, setShowCardModal] = useState(false);
    const [newCard, setNewCard] = useState({ message: '', gifUrl: '', author: '' });
    const navigate = useNavigate();

    // back button nav
    const gobackToHome = () => {
        console.log("im going home")
        navigate(`/`);
    }
    const createCard = async (e) => {
        e.preventDefault(); // prevent default form behavior

        if (!newCard.message || !newCard.gifUrl) {
            alert('Message and GIF URL are required.');
            return;
        }

        await fetch(`/api/boards/${id}/cards`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCard),
        });

        setShowCardModal(false);        // close modal
        setNewCard({ message: '', gifUrl: '', author: '' }); // clear form
        window.location.reload();       // refresh to show new card
    };
    const upvoteCard = async (cardId) => {
        console.log("upvotee!!")
        await fetch(`/api/cards/${cardId}/upvote`, {
            method: 'PATCH',
        })
        window.location.reload()
    }

    const deleteCard = async (cardId) => {
        await fetch(`/api/cards/${cardId}`, { method: 'DELETE' })
        window.location.reload()
    }

    useEffect(() => {
        const fetchBoard = async () => {
            const res = await fetch(`/api/boards/${id}`);
            const data = await res.json();
            setBoard(data);
        };
        fetchBoard();
    }, [id]);

    if (!board) return <div>Loading...</div>;


    return (

        <div>

            {/* Modal */}
            {showCardModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Create New Card</h3>
                        <form onSubmit={createCard}>
                            <input
                                type="text"
                                placeholder="Message *"
                                value={newCard.message}
                                onChange={(e) => setNewCard({ ...newCard, message: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="GIF URL *"
                                value={newCard.gifUrl}
                                onChange={(e) => setNewCard({ ...newCard, gifUrl: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Author (optional)"
                                value={newCard.author}
                                onChange={(e) => setNewCard({ ...newCard, author: e.target.value })}
                            />
                            <div>
                                <button type="submit">Submit</button>
                                <button type="button" onClick={() => setShowCardModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            <button className="brd-details-back" onClick={gobackToHome}> back</button>
            <h2>Board: {board.title}</h2>
            <p>Author: {board.author}</p>
            <p>Category: {board.category}</p>

            <div className="card-grid">
                {board.cards.map((card) => (
                    <div key={card.id} className="card-container">
                        <div className="card-content">
                            <p><strong>{card.message}</strong></p>
                            <img src={card.gifUrl} alt="gif" />
                            <p>Upvotes: {card.upvotes}</p>
                            {card.author && <p>Author: {card.author}</p>}
                            <ul className="card-comments">
                                {card.comments.map((comment) => (
                                    <li key={comment.id}>
                                        {comment.message} <i>– {comment.author}</i>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="card-actions">
                            <button onClick={() => upvoteCard(card.id)}>Upvote</button>
                            <button onClick={() => deleteCard(card.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {/* <button onClick={() => createCard(board.id)}>+ Add Card</button> */}
            <button onClick={() => setShowCardModal(true)}>+ Add Cards</button>

        </div>
    );
};

export default BoardDetailPage;
