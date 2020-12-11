import React, { useState } from 'react';

export default function Question1(props) {
    // Situation: The TestForm component was written by a junior developer who needs some help getting it to function.
    // Please modify the TestForm component such that it will correctly use hooks to validate and post to the endpoint.
    // Feel free to use any (or no) external libraries you feel appropriate.
    // Endpoint docs: https://jsonplaceholder.typicode.com/guide/

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState(1337);
    const [titleError, setTitleError] = useState('');
    const [bodyError, setBodyError] = useState('');

    const formValid = () => {
        let valid = true;
        setTitleError('');
        setBodyError('');

        if (!title.length) {
            setTitleError('You need to enter a title!');
            valid = false;
        }

        if (!body.length) {
            setBodyError('You need to enter a body!');
            valid = false;
        }

        return valid;
    };

    const handleSubmit = async () => {
        if (!formValid()) return;

        let response;
        try {
            response = await fetch(
                'https://jsonplaceholder.typicode.com/posts',
                {
                    method: 'post',
                    data: JSON.toString({
                        title,
                        body,
                        userId,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            );
        } catch (error) {
            return console.log(
                'There was an error creating post: ',
                error.message
            );
        }

        console.log('response', response);
    };

    return (
        <div>
            <div>
                <div>Title:</div>
                <input
                    name={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div>{titleError}</div>
            </div>

            <div>
                <div>Body:</div>
                <input name={body} onChange={(e) => setBody(e.target.value)} />
                <div>{bodyError}</div>
            </div>

            <div>
                <div>UserId:</div>
                <select
                    name={userId}
                    onChange={(e) => setUserId(e.target.value)}
                >
                    <option>1337</option>
                    <option>1234</option>
                    <option>1066</option>
                </select>
            </div>

            <button onClick={() => handleSubmit()} style={{ margin: 10 }}>
                Submit
            </button>
        </div>
    );
}
