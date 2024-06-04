import ChatPage from "@pages/ChatPage/ChatPage";
import HomePage from "@pages/HomePage/HomePage";

export const routerConfig = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "chat",
    element: <ChatPage />,
  },
];
