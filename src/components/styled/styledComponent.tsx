import styled from 'styled-components'

export const SectionWrapper = styled.div`    
padding: 20px;
background-image: linear-gradient(to right , lightblue,white);
border: 1px solid #B0C4EF;
border-radius: 10px;
display: flex;
flex-direction: column;
`;

export const ContentWrapper = styled.div`
display: flex;
flex-wrap: wrap;
`;

export const LeftSection = styled.div`  
text-align: center;  
padding: 5px;
`;

export const RightSection = styled.div`  
background:transparent;
align-self: center;
`;

export const Temp = styled.p`
font-size: 40px;
font-weight: 500;
`

export const SubHeader = styled.p`
 color: #8C8C8C;
 margin: 2px;
`
export const WeatherImg = styled.img`
width: 120px;
height: 120px;
`

export const Divider = styled.div`
border-left: 2px solid gray;
align-self: stretch;
width: 1px;
display: block;
margin-left: 20px;
margin-right: 20px;`

