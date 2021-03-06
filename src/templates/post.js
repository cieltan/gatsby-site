import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Tag from "../components/tag";
import Links from "../components/links";
import { Author, Section, Title, TagsContainer } from './styles';

export const queryPost = graphql`
  query($slug: String!) {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      frontmatter {
        title
        author
        tags
        date
        website
        playStore
        appStore
      }
      body
    }
  }
`;

const PostTemplate = ({ data: { mdx: post } }) => {

  return (
    <Layout>
      <Section>

        <Title>{post.frontmatter.title}</Title>
        <Author>{`By ${post.frontmatter.author} | ${new Date(post.frontmatter.date).toDateString()}`}</Author>
        <TagsContainer>
          {
            post.frontmatter.tags.map((tag, i) => {
              return <Tag key={i}>{tag}</Tag>
            })
          }
        </TagsContainer>
        <Links project={post.frontmatter.website, post.frontmatter.playStore, post.frontmatter.appStore} />
        <MDXRenderer>{post.body}</MDXRenderer>
      </Section>
    </Layout>
  );
}

export default PostTemplate;