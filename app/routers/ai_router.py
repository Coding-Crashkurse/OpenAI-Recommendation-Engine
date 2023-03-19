from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.crud.ai import get_ai_response
from app.db import User
from app.users import current_active_user
from app.crud.system import get_system
from app.db import get_async_session
from fastapi.exceptions import HTTPException
from app.schemas import MessageList

router = APIRouter(tags=["ai"])


@router.post("/ai", status_code=200)
async def create_ai_response(
    history: MessageList,
    conversation: str,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session)
):
    system = await get_system(db=db)
    if system is None:
        raise HTTPException(status_code=403, detail="You have to provide a system message first")
    return await get_ai_response(history, conversation, user=user, system=system)
