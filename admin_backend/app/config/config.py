from aiologger import Logger
from aiologger.levels import LogLevel

app_logger = Logger.with_default_handlers(name="hack_logger", level=LogLevel.DEBUG)