import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

const blogs = [
  {
    date: "Apr 18, 2024",
    title: "CM Fixed Income: Exiting Banking & PSU to Add a New Gilt Fund",
    content:
      "We are increasing the duration of our Fixed Income portfolio to reflect the current macro conditions. We want to take advantage of the current higher rates to further increase the duration of the Gilt funds we hold.",
  },
  {
    date: "Apr 18, 2024",
    title: "Craftsman Automation: Poised for Growth Amid Temporary Headwinds",
    content:
      "Craftsman Automation excels in making precise parts for cars and machines. Amidst temporary headwinds, looks resilient with a focus on growth and innovation.",
  },
  {
    date: "Apr 18, 2024",
    title:
      "The Focused Way of Investing: Our Four-Quadrant Strategy and FY24 Review",
    content:
      "FY24 brought us a 42% gain in our Capitalmind Focused portfolio, gently outperforming the Nifty's 29%. It's been a bit of a rollercoaster, especially these last few months, but that's part of the equity investing.",
  },
];

const HomePage = () => (
  <Container fluid>
    <div className="d-flex justify-content-between mr-4 mb-2">
      <Col className="m-2">
        <Card className="shadow-lg p-3 mb-2 bg-white rounded">
          <CardBody>
            <CardTitle tag="h5">Get started</CardTitle>
            <CardText className="font-weight-light">
              Read our getting started guide to get the most out of it
            </CardText>
          </CardBody>
        </Card>
      </Col>
      <Col className="m-2">
        <Card className="shadow-lg p-3 mb-2 bg-white rounded">
          <CardBody>
            <CardTitle tag="h5">Community</CardTitle>
            <CardText>
              Join the converstaionon our exclusive community on Slack
            </CardText>
          </CardBody>
        </Card>
      </Col>
      <Col className="m-2">
        <Card className="shadow-lg p-3 mb-2 bg-white rounded">
          <CardBody>
            <CardTitle tag="h5">Visit Website</CardTitle>
            <CardText>Keep up wiht our latest content on our webiste</CardText>
          </CardBody>
        </Card>
      </Col>
    </div>

    <h4 style={{marginLeft: "1rem"}}>Latest Posts</h4>
    <div className="d-flex justify-content-between mr-4">
      {blogs.map((blog, index) => (
        <Col key={index} className="m-2">
          <Card className="shadow-lg p-3 mb-2 bg-white rounded">
            <CardBody>
              <p className="text-muted">{blog.date}</p>
              <CardTitle tag="h5">{blog.title}</CardTitle>
              <CardText className="text-muted">{blog.content}</CardText>
              <p className="text-success">Read Full Post</p>
            </CardBody>
          </Card>
        </Col>
      ))}
    </div>
  </Container>
);

export default HomePage;
