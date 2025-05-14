import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./HomePage.css"

const HomePage = () => {
    const [kudosData, setKudosData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [clearTrigger, setClearTrigger] = useState(false);
    const [showBoardModal, setShowBoardModal] = useState(false);
    const [newBoard, setNewBoard] = useState({
        title: '',
        category: '',
        gifUrl: '',
        author: '',
    });

    const navigate = useNavigate();


    const clearSearch = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setClearTrigger(prev => !prev); // toggle trigger
    };

    const onClickBoard = (boardId) => {
        navigate(`/board/${boardId}`);
    };

    const submitSearchResults = () => {
        fetchBoards();
    };



    const createBoard = async (e) => {
        e.preventDefault();
        const { title, category, gifUrl, author } = newBoard;
        if (!title || !category || !gifUrl) {
            alert('Title, Category, and GIF URL are required.');
            return;
        }

        await fetch('/api/boards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, category, gifUrl, author }),
        });

        setShowBoardModal(false);
        setNewBoard({ title: '', category: '', gifUrl: '', author: '' });
        fetchBoards();
    };

    const deleteBoard = async (e, boardId) => {

        e.stopPropagation(); 
        const confirmed = confirm('Are you sure you want to delete this board?');
        if (!confirmed) return;

        const res = await fetch(`/api/boards/${boardId}`, { method: 'DELETE' });
        if (!res.ok) {
            const text = await res.text();
            console.error('Error deleting board:', text);
            return;
        }
        fetchBoards(); // reload boards
    };

    // Fetch boards
    const fetchBoards = async () => {
        let url = '/api/boards?';

        const params = new URLSearchParams();

        if (selectedCategory) {
            if (selectedCategory === 'recent') {
                params.append('filter', 'recent');
            } else {
                params.append('category', selectedCategory);
            }
        }

        if (searchTerm) {
            params.append('search', searchTerm);
        }

        const res = await fetch(url + params.toString());
        const parsed = await res.json();
       // console.log("KUDOS DATA!!: ");
        //console.log(parsed)
        setKudosData(parsed);
    };

    const fetchCategories = async () => {
        const res = await fetch('/api/categories'); // You should create this route
        const parsed = await res.json();
        console.log("categories")
        console.log(parsed)
        setCategories(parsed);
    };

    useEffect(() => {
        fetchBoards();
    }, [selectedCategory, clearTrigger]);

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <section>
            <div className="home-page-container">
                <h1>Home</h1>
                {showBoardModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Create New Board</h3>
                            <form onSubmit={createBoard}>
                                <input
                                    type="text"
                                    placeholder="Title *"
                                    value={newBoard.title}
                                    onChange={(e) => setNewBoard({ ...newBoard, title: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Category *"
                                    value={newBoard.category}
                                    onChange={(e) => setNewBoard({ ...newBoard, category: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="GIF URL *"
                                    value={newBoard.gifUrl}
                                    onChange={(e) => setNewBoard({ ...newBoard, gifUrl: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Author (optional)"
                                    value={newBoard.author}
                                    onChange={(e) => setNewBoard({ ...newBoard, author: e.target.value })}
                                />
                                <div>
                                    <button type="submit">Submit</button>
                                    <button type="button" onClick={() => setShowBoardModal(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}


                <div className="search-bar-home">
                    <input
                        className="search-bar-input"
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              submitSearchResults();
                            }
                          }}
                    />
                    <button className="search-bar-button" onClick={submitSearchResults}>
                        Search
                    </button>
                    <button className="search-bar-button" onClick={clearSearch}>Clear</button>

                </div>

               {/* This is looking at all categories and fetching them from the backend */}
                <div>
                    <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                        <option value="">All Categories</option>
                        <option value="recent">Recent</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Board List */}
                <div className="board-grid">
                    {kudosData.map((board) => (
                        <div
                            className="board-container"
                            key={board.id}
                            style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}
                            onClick={() => onClickBoard(board.id)}
                        >
                            <h2>Title: {board.title}</h2>


                            <figure>
                                <img className="board-gif" src={board.gifUrl} alt="GIF" width={100} />
                                <figcaption>Author: {board.author}</figcaption>
                            </figure>
                            <button
                                className="delete-board-button"
                                onClick={(e) => deleteBoard(e, board.id)}
                            >
                                Delete Board
                            </button>
                        </div>
                    ))}
                </div>

                {/* <button className="create-board-button" onClick={createBoard}>
                    + Create Board
                </button> */}
                <button className="create-board-button" onClick={() => setShowBoardModal(true)}>
                    + Create Board
                </button>
            </div>
        </section>
    );
};

export default HomePage;
