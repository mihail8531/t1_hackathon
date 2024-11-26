from file_services.converter import File, FileConverter


class EmptyConverter(FileConverter):
    def convert_file(self, input_file: File) -> File:
        return input_file
