import React, {useState, useEffect} from 'react'
import axios from 'axios'

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
                <input
                    type="text"
                    value={`${item.title}`}
                    name="title"
                    onChange={handleChanges}
                    placeholder="Title"
                />
                <input
                    type="text"
                    value={`${item.director}`}
                    name="director"
                    onChange={handleChanges}
                    placeholder="Director"
                />
                <input
                    type="text"
                    value={`${item.metascore}`}
                    name="metascore"
                    onChange={handleChanges}
                    placeholder="Metascore"
                />
                <button>Save</button>
            </form>
        )
    }
    
export default UpdateMovie