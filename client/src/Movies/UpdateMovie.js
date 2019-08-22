import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Movie from './Movie';

const UpdateMovie = (props) => {
        const [item, setItem] = useState({id: '',
                                        title: '',
                                        director: '',
                                        metascore: '',
                                        stars: [],
                                        })
                                                
        useEffect(() => {
            const id = props.match.params.id;
            console.log(props.items)
            const itemInArr = props.items.find(item => `${item.id}` === id);
            if (itemInArr) setItem(itemInArr);
        }, [props.items, props.match.params.id]);
                                    
        const handleChanges = event =>{
            setItem({...item, [event.target.name]:event.target.value})
        }

        const handleStarChanges = (i, e) => {
            const updatedStars = [...item.stars]
            updatedStars[i] = e.target.value
            setItem({
                ...item,
                stars: updatedStars
            })
        }
        
        const submitItem = e =>{
            e.preventDefault();
            axios
              .put(`http://localhost:5000/api/movies/${item.id}`, item)
              .then(res => {
                console.log(res);
                props.history.push('/');
              })
              .catch(err => console.log(err.response));
        }
        return (
            <form onSubmit={submitItem}>
                <label>Title: </label>
                <input
                    type="text"
                    value={`${item.title}`}
                    name="title"
                    onChange={handleChanges}
                    placeholder="Title"
                />
                <label> Director: </label>
                <input
                    type="text"
                    value={`${item.director}`}
                    name="director"
                    onChange={handleChanges}
                    placeholder="Director"
                />
                <label> Metascore: </label>
                <input
                    type="text"
                    value={`${item.metascore}`}
                    name="metascore"
                    onChange={handleChanges}
                    placeholder="Metascore"
                />
                <label> Stars: </label>
                {item.stars.map((star,i) => <input 
                                                type="text"
                                                value={`${item.stars[i]}`}
                                                name={`star${i}`}
                                                onChange={(e) => handleStarChanges(i, e)}
                                                placeholder= {`star${i}`}
                                            />)}
                <button>Save</button>
            </form>
        )
    }
    
export default UpdateMovie