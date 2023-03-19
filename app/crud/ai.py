import os

import openai
from dotenv import load_dotenv

from app.db import User
from app.schemas import MessageList, SystemMessage

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")


async def get_ai_response(history: MessageList, message: str, user: User, system: SystemMessage):
    user_hint = f"""
    This is your system message: 
    {system.message}
    
    Always speak to the user with his username, it should be a very personal conversation.
    If the Username is: 'Edgar' I want you to say 'Hi Edgar' or 'Great Edgar'. Names are important.
    Take his personal interests into the consideration for your answer!

    USER INFORMATION --- VERY IMPORTANT ---
    Username: {user.username}, Interests: {user.interests}.
    """
    context = [
        {"role": "system", "content": user_hint}
    ]
    context.extend(history.dict()["messages"])
    context.append({"role": "user", "content": message})
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=context,
    )
    return response
