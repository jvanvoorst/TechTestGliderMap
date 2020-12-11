import React, { useState, useEffect } from 'react';

export default function Question2(props) {
    // Situation: Create a search bar that filters items in the list as the user types.
    // Feel free to refactor as you feel necessary.

    const [searchText, setSearchText] = useState('');
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        let shoppingList = [
            'Peanut Butter',
            'Peas',
            'Butter',
            'Beans',
            'Eggs',
            'Quiche',
            'Cheese',
        ];

        if (searchText) {
            return setFilteredList(
                shoppingList.filter((i) =>
                    i.toLowerCase().includes(searchText.toLowerCase())
                )
            );
        }

        setFilteredList(shoppingList);
    }, [searchText]);

    return (
        <div>
            <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            {filteredList.map((item, i) => {
                return <div key={i}>{item}</div>;
            })}
        </div>
    );
}
