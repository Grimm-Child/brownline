from wagtail.images.blocks import ImageChooserBlock
from wagtail.embeds.blocks import EmbedBlock
from wagtail.core.blocks import (
    CharBlock, ChoiceBlock, RichTextBlock, StreamBlock, StructBlock, TextBlock,
)

class HeadingBlock(StructBlock):
    """
    Allows users to select custom heading size
    """
    heading_text = CharBlock(classname="title", required=True)
    size = ChoiceBlock(choices=[
        ('', 'Select a header size'),
        ('h2', 'H2'),
        ('h3', 'H3'),
        ('h4', 'H4'),
        ('h5', 'H5'),
        ('h6', 'H6'),
    ], blank=True, required=False)

    class Meta:
        icon = "title"
        template = "blocks/heading_block.html"

class ImageBlock(StructBlock):
    """
    For properly structured content blocks containing text and images
    """
    image = ImageChooserBlock(required=True)
    caption = CharBlock(required=False)
    credit = CharBlock(required=False)

    class Meta:
        icon = 'image'
        template = "blocks/image_block.html"

class BlockQuote(StructBlock):
    """
    A custom quote block with author credits
    """
    text = TextBlock()
    attribute_name = CharBlock(
        blank=True, required=False, label='e.g. John Doe')

    class Meta:
        icon = "fa-quote-left"
        template = "blocks/blockquote.html"


# StreamBlocks
class BaseStreamBlock(StreamBlock):
    """
    Define the custom blocks that `StreamField` will utilize
    """
    heading_block = HeadingBlock()
    paragraph_block = RichTextBlock(
        icon="fa-paragraph",
        template="blocks/paragraph_block.html"
    )
    image_block = ImageBlock()
    block_quote = BlockQuote()
    embed_block = EmbedBlock(
        help_text='Insert an embed URL e.g https://www.youtube.com/embed/SGJFWirQ3ks',
        icon="fa-s15",
        template="blocks/embed_block.html")