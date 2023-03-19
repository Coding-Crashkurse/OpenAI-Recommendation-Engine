from typing import AsyncGenerator

from fastapi import Depends
from fastapi_users.db import SQLAlchemyBaseUserTableUUID, SQLAlchemyUserDatabase
from sqlalchemy import Column, Enum, Integer, String
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.schemas import Level

DATABASE_URL = "sqlite+aiosqlite:///./test.db"
Base = declarative_base()


class User(SQLAlchemyBaseUserTableUUID, Base):
    username = Column(String(100))
    level = Column(Enum(Level))
    interests = Column(String)


class MessageModel(Base):
    __tablename__ = "systemmessage"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String(500))


engine = create_async_engine(DATABASE_URL)
async_session_maker = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)
