from django.contrib.auth import get_user_model
from ninja_extra import (
    ModelConfig,
    ModelControllerBase,
    ModelSchemaConfig,
    api_controller,
    NinjaExtraAPI
)
from ninja_extra import ModelService
from typing import Any
from authapi.schema import UserSchema, UserCreateSchema

User = get_user_model()

class UserModelService(ModelService):
    def create(self, schema, **kwargs: Any) -> Any:
        
        data = schema.dict()
        data.update(kwargs)

        print("data")
        print(data)
        password = data.pop('password', None)
        print("password")
        print(password)
        
        instance = self.model._default_manager.create(**data)
        instance.set_password(password)
        instance.save()
        return instance

@api_controller("/users")
class UserModelController(ModelControllerBase):
    service = UserModelService(model=User)

    model_config = ModelConfig(
        model=User,
        create_schema=UserCreateSchema,
        update_schema=None,
        schema_config=ModelSchemaConfig(read_only_fields=["id"],
        include=['id', 'username', 'first_name', 'is_staff', 'is_shopper', 'is_seller']),
        
    )