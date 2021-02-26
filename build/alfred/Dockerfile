FROM golang:1.15
ADD https://api.github.com/repos/kh42z/alfred/git/refs/heads/master version.json
RUN git clone --depth 1 https://github.com/kh42z/alfred.git && cd alfred && go build
CMD /go/alfred/alfred