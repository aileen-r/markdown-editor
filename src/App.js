import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import marked from 'marked';
import DOMPurify from 'dompurify';
import autosize from 'autosize';

import Editor from 'components/Editor';
import Preview from 'components/Preview';

const placeholderPath = require('placeholder.md');

class App extends Component {
  constructor() {
    super();
    this.state = {
      markdownRaw: '',
      markdownHtml: ''
    };
    this.getRenderedMarkdown = this.getRenderedMarkdown.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    fetch(placeholderPath)
      .then(res => res.text())
      .then(text =>
        this.setState({
          markdownRaw: text,
          markdownHtml: this.getRenderedMarkdown(text)
        })
      );
  }

  getRenderedMarkdown(raw) {
    const options = {
      gfm: true, // GitHub Flavored Markdown
      breaks: true // inserts <br/> on single line breaks
    };
    return DOMPurify.sanitize(marked(raw, options));
  }

  onInputChange(e) {
    autosize(e.target);
    this.setState({
      markdownRaw: e.target.value,
      markdownHtml: this.getRenderedMarkdown(e.target.value)
    });
  }

  render() {
    return (
      <div className="App">
        <Container fluid={true}>
          <div className="px-4 py-5">
            <header className="mb-5 d-flex justify-content-center">
              <h1>Simple Markdown Editor</h1>
            </header>
            <Row>
              <Col>
                <Editor
                  markdown={this.state.markdownRaw}
                  onInputChange={this.onInputChange}
                />
              </Col>
              <Col>
                <Preview markdown={this.state.markdownHtml} />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
