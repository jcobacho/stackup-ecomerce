from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class UserCreateForm2(UserCreationForm):
    class Meta:
        model = User
        fields = ('username','password1', 'password2', 'is_staff', 'is_seller', 'is_shopper')
        # field_classes = {"email": EmailField}

    # placeholders = ['example@email.com', 'Username', ]

class CustomUserChangeForm(UserChangeForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    disabled password hash display field.
    """
    class Meta:
        model = User
        exclude = []
        # exclude = ['is_staff']
        readonly_fields = ['date_joined']
        # fields = ["email", "password", "is_active", "bank_name"]


class AccountAdmin(UserAdmin):
    form = CustomUserChangeForm
    add_form = UserCreateForm2
    list_display = ('username', 'first_name', 'last_login', 'is_staff','is_seller', 'is_shopper' )
    search_fields = ('username', 'first_name')
    readonly_fields = ('date_joined', 'last_login')
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "email")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    'is_seller', 
                    'is_shopper',
                    "is_superuser",
                    # "groups",
                    # "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
            (
                None,
                {
                    'classes': ('wide',),
                    'fields': ('username', 'first_name', 'password1', 'password2', 'is_staff','is_seller', 'is_shopper'),
                },
            ),
        )

    # def get_form(self, request, obj=None, **kwargs):
    #     """
    #     Use special form during user creation
    #     """
    #     return self.form

# Register your models here.
admin.site.register(get_user_model(), AccountAdmin)
