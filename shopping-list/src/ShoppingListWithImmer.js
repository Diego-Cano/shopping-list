import React from 'react';
import { useImmer } from 'use-immer';
import './ShoppingListWithImmer.css';

function ShoppingListWithImmer() {
  const [shoppingList, updateShoppingList] = useImmer([
    { id: 1, name: 'Milk', quantity: 2, details: { category: 'Dairy', notes: 'Get lactose-free' } },
    { id: 2, name: 'Eggs', quantity: 12, details: { category: 'Poultry', notes: 'Get organic' } },
  ]);

  const addItem = () => {
    const itemName = prompt('Item name:');
    const itemQuantity = prompt('Quantity:');
    const itemCategory = prompt('Category:');
    const itemNotes = prompt('Notes:');
    updateShoppingList(draft => {
      draft.push({
        id: draft.length + 1,
        name: itemName,
        quantity: parseInt(itemQuantity, 10),
        details: { category: itemCategory, notes: itemNotes },
      });
    });
  };

  const updateItem = (id) => {
    // Find the item in the shoppingList
    const itemIndex = shoppingList.findIndex(item => item.id === id);
    if (itemIndex === -1) return; // Item not found
    
    // Prompt for new values. Pre-fill the prompts with current values as defaults.
    const newItemValues = {
      name: prompt('New item name:', shoppingList[itemIndex].name),
      quantity: prompt('New quantity:', shoppingList[itemIndex].quantity),
      category: prompt('New category:', shoppingList[itemIndex].details.category),
      notes: prompt('New notes:', shoppingList[itemIndex].details.notes),
    };
    
    updateShoppingList(draft => {
      const item = draft[itemIndex];
      item.name = newItemValues.name;
      item.quantity = parseInt(newItemValues.quantity, 10) || item.quantity; // Keep current quantity if input is invalid
      item.details.category = newItemValues.category;
      item.details.notes = newItemValues.notes;
    });
  };

  const removeItem = (id) => {
    updateShoppingList(draft => draft.filter(item => item.id !== id));
  };

  return (
    <div className="shopping-list">
      <h2>Shopping List</h2>
      <button onClick={addItem}>Add Item</button>
      {shoppingList.map(item => (
        <div key={item.id} className="item">
          <h3>{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Category: {item.details.category}</p>
          <p>Notes: {item.details.notes}</p>
          <button onClick={() => updateItem(item.id)}>Update</button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default ShoppingListWithImmer;
