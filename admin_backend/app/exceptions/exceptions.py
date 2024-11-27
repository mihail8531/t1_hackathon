class ApplicationError(Exception):
    pass


class RepositoryError(ApplicationError):
    pass


class NotFoundError(RepositoryError):
    pass
