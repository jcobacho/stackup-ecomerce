from django.contrib.auth import get_user_model
from ninja_extra import (
    ModelConfig,
    ModelService,
    ModelControllerBase,
    ModelSchemaConfig,
    api_controller,
    permissions
)
from pydantic import BaseModel as PydanticModel

from django.db.models import Model, QuerySet

from typing import Any
from authapi.schema import UserSchema, UserCreateSchema, UserUpdateSchema
from ninja_jwt.authentication import JWTAuth

User = get_user_model()

class UserModelService(ModelService):
    def create(self, schema, **kwargs: Any) -> Any:

        password = schema.dict().pop('password', None)
        instance = super().create(schema, **kwargs)
        instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance: Model, schema: PydanticModel, **kwargs: Any) -> Any:

        password = schema.dict().pop('password', None)
        instance = super().update(instance, schema, **kwargs)
        if password:
            instance.set_password(password)
            instance.save()
        return instance

@api_controller("/users", auth=JWTAuth(), permissions=[permissions.IsAdminUser])
class UserModelController(ModelControllerBase):
    service = UserModelService(model=User)

    model_config = ModelConfig(
        model=User,
        create_schema=UserCreateSchema,
        update_schema=UserUpdateSchema,
        schema_config=ModelSchemaConfig(read_only_fields=["id"],
        include=['id', 'username', 'first_name', 'is_staff', 'is_shopper', 'is_seller']),
        
    )