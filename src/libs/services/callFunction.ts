import {
  FunctionCallingMode,
  FunctionDeclaration,
  FunctionDeclarationSchemaType,
  GoogleGenerativeAI,
} from "@google/generative-ai";

export async function callFunction(
  text: string
): Promise<{ name: string; args: any }> {
  const genAI = new GoogleGenerativeAI(`${process.env.API_KEY_GEMINI}`);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    tools: [
      {
        functionDeclarations: [
          changePage,
          setInputText,
          viewBooks,
          addNewBook,
          viewStatistics,
          sortBooks,
          selectBookByName,
          selectFolderByName,
          selectCategories,
          removeCategories,
          viewLastData,
          filterByStatusOrRole,
          removeFilter,
          newCategory,
        ],
      },
    ],
    toolConfig: {
      functionCallingConfig: {
        mode: FunctionCallingMode.AUTO,
      },
    },
  });

  const prompt = `${text}`;
  const result = await model.generateContent(prompt);
  if (result.response.functionCalls() != undefined) {
    const responseFunctions = result.response.functionCalls();
    if (responseFunctions) {
      return responseFunctions[0];
    } else {
      throw new Error();
    }
  } else {
    throw new Error();
  }
}

const changePage: FunctionDeclaration = {
  name: "changePage",
  description: "Change the page of the table.",
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    properties: {
      action: {
        type: FunctionDeclarationSchemaType.STRING,
        description:
          "The action to perform. Can be 'next' to go to the next page, 'previous' to go to the previous page, or 'goTo' to go to a specific page.",
      },
      pageNumber: {
        type: FunctionDeclarationSchemaType.NUMBER,
        description: "The page number to go to. Required if action is 'goTo'.",
      },
    },
  },
};

const setInputText: FunctionDeclaration = {
  name: "setInputText",
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    description: "Set the text of an input.",
    properties: {
      inputName: {
        type: FunctionDeclarationSchemaType.STRING,
        description:
          "The name of the input to set the text in.Can be 'names' if it detects a name or several names of people, 'lastNames' if it detects that it a last names, can be 'birthday' if it detects the birthday, can be 'mail' if it detects that it is an email, 'profilePicture' if it detects that it is the profile picture, 'bookName' if it is told to search for a book either by author or by book name.",
      },
      text: {
        type: FunctionDeclarationSchemaType.STRING,
        description:
          "The text to set in the input. yyyy-MM-dd if it is a birthday.",
      },
    },
  },
};

// CREATOR OF BOOKS

//HOME
const viewBooks: FunctionDeclaration = {
  name: "viewBooks",
  description: "View all the books I have created.",
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    properties: {},
  },
};

const addNewBook: FunctionDeclaration = {
  name: "addNewBook",
  description: "Add a new book.",
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    properties: {},
  },
};

const viewStatistics: FunctionDeclaration = {
  name: "viewStatistics",
  description: "View the statistics by book.",
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    properties: {
      book: {
        type: FunctionDeclarationSchemaType.STRING,
        description: "The book to view the statistics.",
      },
    },
  },
};

//USER READER

//SEARCH BOOK

const sortBooks: FunctionDeclaration = {
  name: "sortBooks",
  description: "Sort the books.",
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    properties: {
      sortBy: {
        type: FunctionDeclarationSchemaType.STRING,
        description:
          "The field to sort the books by. Can be 'author', 'publicationDate', or 'book'.",
      },
      order: {
        type: FunctionDeclarationSchemaType.STRING,
        description:
          "The order to sort the books in. Can be 'asc' for ascending order or 'desc' for descending order.",
      },
    },
  },
};

const selectBookByName: FunctionDeclaration = {
  name: "selectBookByName",
  description: "Select a book by its name.",
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    properties: {
      bookName: {
        type: FunctionDeclarationSchemaType.STRING,
        description: "The name of the book to select.",
      },
    },
  },
};

//FAVORITES

const selectFolderByName: FunctionDeclaration = {
  name: "selectFolderByName",
  description: "Select a folder by its name.",
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    properties: {
      folderName: {
        type: FunctionDeclarationSchemaType.STRING,
        description: "The name of the folder to select.",
      },
    },
  },
};

//HOME

const selectCategories: FunctionDeclaration = {
  name: "selectCategories",
  description: "Select categories to filter the books.",
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    properties: {
      categories: {
        type: FunctionDeclarationSchemaType.ARRAY,
        description: "The categories to filter the books.",
        items: {
          type: FunctionDeclarationSchemaType.STRING,
          properties: {
            category: {
              type: FunctionDeclarationSchemaType.STRING,
              description: "The category to filter the books.",
            },
          },
        },
      },
    },
  },
};

const removeCategories: FunctionDeclaration = {
  name: "removeCategories",
  description: "Remove categories to filter the books.",
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    properties: {
      categories: {
        type: FunctionDeclarationSchemaType.ARRAY,
        description: "The categories to remove from the books.",
        items: {
          type: FunctionDeclarationSchemaType.STRING,
          properties: {
            category: {
              type: FunctionDeclarationSchemaType.STRING,
              description: "The category to remove from the books.",
            },
          },
        },
      },
    },
  },
};

//ADMIN

//HOME
const viewLastData: FunctionDeclaration = {
  name: "viewLastData",
  description: "View the last data.",
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    properties: {
      entity: {
        type: FunctionDeclarationSchemaType.STRING,
        description: "The entity to view the last data.",
      },
    },
  },
};

//USERS
const filterByStatusOrRole: FunctionDeclaration = {
  description: "Filter users by status or role.",
  name: "filterByStatusOrRole",
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    properties: {
      status: {
        type: FunctionDeclarationSchemaType.STRING,
        description:
          "The status to filter the users. Can be 'true' for actives OR 'false' for inactives.",
      },
      role: {
        type: FunctionDeclarationSchemaType.STRING,
        description:
          "The role to filter the users. Can be 'CREATOR' for creator of books OR 'READER' for reader of books.",
      },
    },
  },
};

const removeFilter: FunctionDeclaration = {
  name: "removeFilter",
  description: "Remove the filter.",
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    properties: {
      filter: {
        type: FunctionDeclarationSchemaType.STRING,
        description:
          "The name of the filter to remove. Can be 'status' OR 'role'",
      },
      all: {
        type: FunctionDeclarationSchemaType.STRING,
        description: "Remove all filters. Can be 'true' OR 'false'",
      },
    },
  },
};

//CATEGORIES

const newCategory: FunctionDeclaration = {
  name: "newCategory",
  description: "Create a new category.",
  parameters: {
    type: FunctionDeclarationSchemaType.OBJECT,
    properties: {},
  },
};
