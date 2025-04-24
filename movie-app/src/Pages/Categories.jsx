import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';

function Categories() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://newsdata.io/api/1/news?apikey=pub_82677d9c908707d2810dc6e663323e839f397&q=movie&language=en&category=entertainment'

      )
      .then((res) => {
        setNews(res.data.results);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  }, []);

  return (
    <Container>
      <h2>🎬 Latest Movie News</h2>
      <NewsGrid>
        {news.map((article, index) => (
          <Card
            as={motion.div}
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
          >
            {article.image_url && (
              <Image src={article.image_url} alt="news" />
            )}
            <h3>{article.title}</h3>
            <p>{article.description?.substring(0, 100)}...</p>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </Card>
        ))}
      </NewsGrid>
    </Container>
  );
}

export default Categories;
const Container = styled.div`
  padding: 50px 80px;
  background-color: #0d0d0d;
  color: white;

  h2 {
    font-size: 32px;
    color: #ff4d4d;
    margin-bottom: 30px;
    text-align: center;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
`;

const Card = styled.div`
  background: #1a1a1a;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;
  overflow: hidden;

  h3 {
    font-size: 20px;
    margin: 15px 0 10px;
    color: #1f80e0;
  }

  p {
    font-size: 14px;
    color: #ccc;
    margin-bottom: 10px;
  }

  a {
    color: #ff4d4d;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
`;
