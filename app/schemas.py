from enum import Enum

from fastapi_users.schemas import BaseUser, BaseUserCreate, BaseUserUpdate
from pydantic import BaseModel


class Level(Enum):
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "Advanced"
    EXPERT = "Expert"


class UserBase(BaseModel):
    username: str
    level: Level
    interests: str


class UserRead(BaseUser, UserBase):
    pass


class UserCreate(BaseUserCreate, UserBase):
    pass


class UserUpdate(BaseUserUpdate, UserBase):
    pass
