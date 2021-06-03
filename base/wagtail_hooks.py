from wagtail.contrib.modeladmin.options import (
    ModelAdmin, ModelAdminGroup, modeladmin_register)

from base.models import People, FooterText

'''
N.B. To see what icons are available for use in Wagtail menus and StreamField block types,
enable the styleguide in settings:
INSTALLED_APPS = (
   ...
   'wagtail.contrib.styleguide',
   ...
)
or see http://kave.github.io/general/2015/12/06/wagtail-streamfield-icons.html
This demo project includes the full font-awesome set via CDN in base.html, so the entire
font-awesome icon set is available to you. Options are at http://fontawesome.io/icons/.
'''

class PeopleModelAdmin(ModelAdmin):
    model = People
    menu_label = 'People'  # ditch this to use verbose_name_plural from model
    menu_icon = 'fa-users'  # change as required
    list_display = ('first_name', 'last_name', 'rank', 'thumb_image')
    list_filter = ('rank', )
    search_fields = ('first_name', 'last_name', 'rank')


class FooterTextAdmin(ModelAdmin):
    model = FooterText
    search_fields = ('body',)


class SiteModelAdminGroup(ModelAdminGroup):
    menu_label = 'Site Misc'
    menu_icon = 'fa-settings'  # change as required
    menu_order = 300  # will put in 4th place (000 being 1st, 100 2nd)
    items = (PeopleModelAdmin, FooterTextAdmin)


# When using a ModelAdminGroup class to group several ModelAdmin classes together,
# you only need to register the ModelAdminGroup class with Wagtail:
modeladmin_register(SiteModelAdminGroup)