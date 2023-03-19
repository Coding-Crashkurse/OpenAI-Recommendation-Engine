from fastapi.exceptions import HTTPException
from sqlalchemy import delete, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import MessageModel
from app.schemas import SystemMessage


async def create_system(db: AsyncSession, message: SystemMessage):
    stmt = select(MessageModel).limit(1)
    result = await db.execute(stmt)
    if result.one_or_none() is not None:
        raise HTTPException(status_code=403, detail="Only one System message allowed")

    message = MessageModel(message=message.message)
    db.add(message)
    await db.commit()
    await db.refresh(message)
    return message


async def get_system(db: AsyncSession):
    stmt = select(MessageModel).limit(1)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()


async def update_system(db: AsyncSession, message: SystemMessage):
    stmt = select(MessageModel).limit(1)
    result = await db.execute(stmt)
    message_instance = result.scalar_one_or_none()
    if message_instance is None:
        raise HTTPException(status_code=404, detail="System message not found")

    update_stmt = (
        update(MessageModel)
        .where(MessageModel.id == message_instance.id)
        .values(message=message.message)
    )
    await db.execute(update_stmt)
    await db.commit()

    return message


async def delete_system(db: AsyncSession):
    stmt = select(MessageModel).limit(1)
    result = await db.execute(stmt)
    message_instance = result.scalar_one_or_none()
    if message_instance is None:
        raise HTTPException(status_code=404, detail="System message not found")

    delete_stmt = delete(MessageModel).where(MessageModel.id == message_instance.id)
    await db.execute(delete_stmt)
    await db.commit()

    return {"detail": "System message deleted"}
