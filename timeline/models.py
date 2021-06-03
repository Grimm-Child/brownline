# coding: utf-8
from django.db import models
import ast

class ListField(models.TextField):
    description = "Stores objects as a list"

    def __init__(self, *args, **kwargs):
        ...

    def from_db_value(self, value, expression, connection, context):
        ...

    def to_python(self, value):
        if not value:
            value = []

        if isinstance(value, list):
            return value

        return ast.literal_eval(value)

    def get_prep_value(self, value):
        if value is None:
            return value

        return unicode(value)

    def value_to_string(self, obj):
        value = self._get_val_from_obj(obj)
        return self.get_db_prep_value(value)


class Timeline(models.Model):
    headline = models.CharField(max_length=200, help_text='Headline for timeline')
    type = models.CharField(max_length=50, default="default")
    start_date = models.DateField(blank=True, help_text='Timeline start date')
    text = models.TextField(blank=True, help_text='Description of timeline')
    asset_media = models.CharField(max_length=200, blank=True, verbose_name='media', help_text='Media to add to event info: Picutre link, YouTube, Wikipedia, etc.')
    asset_credit = models.CharField(max_length=200, blank=True, verbose_name='credit', help_text='Media credits here')
    asset_caption = models.CharField(max_length=200, blank=True, verbose_name='caption', help_text='Caption for media')

    def to_dict(self):
        d = {}
        d['startDate'] = self.start_date.strftime('%Y,%m,%d')
        d['type'] = self.type
        d['headline'] = self.headline
        d['text'] = self.text
        d['asset'] = {'media': self.asset_media, 'credit': self.asset_credit, 'caption': self.asset_caption }
        events = []
        for e in self.timelineevent_set.all():
            events.append(dict([(attr, getattr(e, attr)) for attr in [f.name for f in e._meta.fields]]))
        d['date'] = [ e.to_dict() for e in self.timelineevent_set.all()]
        timeline = {'timeline': d}
        return timeline

    def __str__(self):
        return "%s - %s" % (self.start_date, self.headline)

    def __unicode__(self):
        return self.__str__()


class TimelineEvent(models.Model):
    timeline = models.ForeignKey('Timeline', on_delete=models.CASCADE)
    start_date = models.DateField(help_text='Event start date')
    end_date = models.DateField(blank=True, null=True, help_text='Event end date')
    headline = models.CharField(max_length=200, blank=True, help_text='Headline for event')
    text = models.TextField(blank=True, help_text='Text description of event')
    asset_media = models.CharField(max_length=200, blank=True, verbose_name='media', help_text='Media to add to even info: Picutre link, YouTube, Wikipedia, etc.')
    asset_credit = models.CharField(max_length=200, blank=True, verbose_name='credit', help_text='Media credits here')
    asset_caption = models.CharField(max_length=200, blank=True, verbose_name='caption', help_text='Caption for media')

    def to_dict(self):
        d = {}
        d['startDate'] = self.start_date.isoformat().split('T')[0].replace('-', ',')
        d['endDate'] = self.end_date.isoformat().split('T')[0].replace('-', ',') if self.end_date else d['startDate']
        d['headline'] = self.headline
        d['text'] = self.text
        d['asset'] = {'media': self.asset_media, 'credit': self.asset_credit, 'caption': self.asset_caption }
        return d

    def __str__(self):
        return "%s - %s %s" % (self.start_date, self.end_date, self.headline)

    def __unicode__(self):
        return self.__str__()

class TimelineOptions(models.Model):
    FONT_CHOICES = (
            ('Arvo-PTSans', 'Arvo-PTSans'),
            ('Merriweather-NewsCycle', 'Merriweather-NewsCycle'),
            ('PoiretOne-Molengo', 'PoiretOne-Molengo'),
            ('PTSerif-PTSans', 'PTSerif-PTSans'),
            ('DroidSerif-DroidSans', 'DroidSerif-DroidSans'),
            ('Lekton-Molengo', 'Lekton-Molengo'),
            ('NixieOne-Ledger', 'NixieOne-Ledger'),
            ('AbrilFatface-Average', 'AbrilFatface-Average'),
            ('PlayfairDisplay-Muli', 'PlayfairDisplay-Muli'),
            ('Rancho-Gudea', 'Rancho-Gudea'),
            ('Bevan-PotanoSans', 'Bevan-PotanoSans'),
            ('BreeSerif-OpenSans', 'BreeSerif-OpenSans'),
            ('SansitaOne-Kameron', 'SansitaOne-Kameron'),
            ('Pacifico-Arimo', 'Pacifico-Arimo')
        )
    timeline = models.OneToOneField('Timeline', primary_key=True, on_delete=models.CASCADE)
    width = models.CharField(max_length=10, default='100%',
                help_text='Width of timeline DIV')
    height = models.CharField(max_length=10, default='600',
                help_text='Height of timeline DIV')
    embed_id = models.CharField(max_length=20, blank=True,
                help_text='ID of timeline DIV')
    start_at_end = models.BooleanField(default=False,
                help_text='Set to true to start the timeline on the last date. default is false')
    start_at_slide = models.IntegerField(default=0,
                help_text='You can tell TimelineJS to start at a specific slide number default is 0')
    start_zoom_adjust = models.IntegerField(default=0,
                help_text='This will tweak the default zoom level. Equivalent to pressing the zoom in or zoom out button the specified number of times. Negative numbers zoom out. default is 0')
    hash_bookmark = models.BooleanField(default=False,
                help_text='set to true to allow bookmarking slides using the hash tag default is false')
    font = models.CharField(max_length=50, choices=FONT_CHOICES, default='Bevan-PotanoSans',
                help_text='Font combination options')
    debug = models.BooleanField(default=False,
                help_text='Will log events etc to the console. default is false')

    class Meta:
        verbose_name_plural = 'Timeline Options'

#'''JSON Format
#{
#    "timeline":
#    {
#        "headline":"The Main Timeline Headline Goes here",
#        "type":"default",
#        "startDate":"1888",
#        "text":"<p>Intro body text goes here, some HTML is ok</p>",
#        "asset":
#        {
#            "media":"http://yourdomain_or_socialmedialink_goes_here.jpg",
#            "credit":"Credit Name Goes Here",
#            "caption":"Caption text goes here"
#        },
#        "date": [
#            {
#                "startDate":"2011,12,10",
#                "endDate":"2011,12,11",
#                "headline":"Headline Goes Here",
#                "text":"<p>Body text goes here, some HTML is OK</p>",
#                "asset":
#                {
#                    "media":"http://twitter.com/ArjunaSoriano/status/164181156147900416",
#                    "credit":"Credit Name Goes Here",
#                    "caption":"Caption text goes here"
#                }
#            }
#        ]
#    }
#}
#'''