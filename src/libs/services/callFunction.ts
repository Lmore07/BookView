const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function callFunction(
  text: string
): Promise<{ name: string; args: any }> {
  const genAI = new GoogleGenerativeAI(
    `AIzaSyDUpQOlXtL6O-Omdab-eBUOA0HHupVZF3o`
  );
  const model = genAI.getGenerativeModel({
    model: "gemini-1.0-pro",
    tools: {
      functionDeclarations: [
        selectCategories,
        generateDefinition,
        removeCategories,
        setInputText,
        sortBooks,
        selectBookByName,
        changePage,
        selectFolderByName,
        viewLastData,
        filterByStatusOrRole,
        removeFilter,
        newCategory,
        viewBooks,
        addNewBook,
        viewStatistics,
      ],
    },
  });

  const prompt = `${text}`;
  const result = await model.generateContent(prompt);
  const call = result.response.functionCalls()[0];
  return call;
}

const changePage = {
  name: "changePage",
  parameters: {
    type: "OBJECT",
    description: "Change the page of the table.",
    properties: {
      action: {
        type: "STRING",
        description:
          "The action to perform. Can be 'next' to go to the next page, 'previous' to go to the previous page, or 'goTo' to go to a specific page.",
      },
      pageNumber: {
        type: "INTEGER",
        description: "The page number to go to. Required if action is 'goTo'.",
      },
    },
  },
};

const setInputText = {
  name: "setInputText",
  parameters: {
    type: "OBJECT",
    description: "Set the text of an input.",
    properties: {
      inputName: {
        type: "STRING",
        description:
          "The name of the input to set the text in.Can be 'names' if it detects a name or several names of people, 'lastNames' if it detects that it a last names, can be 'birthday' if it detects the birthday, can be 'mail' if it detects that it is an email, 'profilePicture' if it detects that it is the profile picture, 'bookName' if it is told to search for a book either by author or by book name.",
      },
      text: {
        type: "STRING",
        description:
          "The text to set in the input. yyyy-MM-dd if it is a birthday.",
      },
    },
  },
};

const generateDefinition = {
  name: "generateDefinition",
  parameters: {
    type: "OBJECT",
    description: "Generate a definition for a word.",
    properties: {
      text: {
        type: "STRING",
        description: "The word to generate a definition for it",
      },
    },
    required: ["text"],
  },
};

// CREATOR OF BOOKS

//HOME
const viewBooks = {
  name: "viewBooks",
  parameters: {
    type: "OBJECT",
    description: "View all the books I have created.",
  },
};

const addNewBook = {
  name: "addNewBook",
  parameters: {
    type: "OBJECT",
    description: "Add a new book.",
  },
};

const viewStatistics = {
  name: "viewStatistics",
  parameters: {
    type: "OBJECT",
    description: "View the statistics by book.",
    properties: {
      book: {
        type: "STRING",
        description: "The book to view the statistics.",
      },
    },
  },
};

//USER READER

//SEARCH BOOK

const sortBooks = {
  name: "sortBooks",
  parameters: {
    type: "OBJECT",
    description: "Sort the books.",
    properties: {
      sortBy: {
        type: "STRING",
        description:
          "The field to sort the books by. Can be 'author', 'publicationDate', or 'book'.",
      },
      order: {
        type: "STRING",
        description:
          "The order to sort the books in. Can be 'asc' for ascending order or 'desc' for descending order.",
      },
    },
  },
};

const selectBookByName = {
  name: "selectBookByName",
  parameters: {
    type: "OBJECT",
    description: "Select a book by its name.",
    properties: {
      bookName: {
        type: "STRING",
        description: "The name of the book to select.",
      },
    },
  },
};

//FAVORITES

const selectFolderByName = {
  name: "selectFolderByName",
  parameters: {
    type: "OBJECT",
    description: "Select a folder by its name.",
    properties: {
      folderName: {
        type: "STRING",
        description: "The name of the folder to select.",
      },
    },
  },
};

//HOME

const selectCategories = {
  name: "selectCategories",
  parameters: {
    type: "OBJECT",
    description: "Select categories to filter the books.",
    properties: {
      categories: {
        type: "ARRAY",
        description: "The categories to filter the books.",
        items: {
          type: "STRING",
        },
      },
    },
  },
};

const removeCategories = {
  name: "removeCategories",
  parameters: {
    type: "OBJECT",
    description: "Remove categories to filter the books.",
    properties: {
      categories: {
        type: "ARRAY",
        description: "The categories to remove from the books.",
        items: {
          type: "STRING",
        },
      },
    },
  },
};



//ADMIN

//HOME
const viewLastData = {
  name: "viewLastData",
  parameters: {
    type: "OBJECT",
    description: "View the last data.",
    properties: {
      entity: {
        type: "STRING",
        description: "The entity to view the last data.",
      },
    },
  },
};

//USERS
const filterByStatusOrRole = {
  name: "filterByStatusOrRole",
  parameters: {
    type: "OBJECT",
    description: "Filter users by status or role.",
    properties: {
      status: {
        type: "STRING",
        description:
          "The status to filter the users. Can be 'true' for actives OR 'false' for inactives.",
      },
      role: {
        type: "STRING",
        description:
          "The role to filter the users. Can be 'CREATOR' for creator of books OR 'READER' for reader of books.",
      },
    },
  },
};

const removeFilter = {
  name: "removeFilter",
  parameters: {
    type: "OBJECT",
    description: "Remove the filter.",
    properties: {
      filter: {
        type: "STRING",
        description:
          "The name of the filter to remove. Can be 'status' OR 'role'",
      },
      all: {
        type: "STRING",
        description: "Remove all filters. Can be 'true' OR 'false'",
      },
    },
  },
};

//CATEGORIES

const newCategory = {
  name: "newCategory",
  parameters: {
    type: "OBJECT",
    description: "Create a new category.",
  },
};
