export const initialStore = () => {
  return {
    userList: [],
    currentUser: {
      slug: "",
      id: null
    },
    contactList: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case 'set-user-list':
      return {
        ...store,
        userList: action.payload
      };

    case "set-current-user":
      return {
        ...store,
        currentUser: action.payload
      }
    case "set-contact-list":
      return {
        ...store,
        contactList: action.payload
      }
    case "new-user":
      let newList = [...store.userList, action.payload]
      return {
        ...store,
        userList: newList
      }
    case "delete-user":
      let newUserList = store.userList.filter((ele) => ele.id != action.payload)
      return {
        ...store,
        userList: newUserList
      }
    case "delete-contact":
      let deleteList = store.contactList.filter((ele) => ele.id != action.payload)
      return{
        ...store,
        contactList:deleteList
      }

    default:
      throw Error('Unknown action.');
  }
}
