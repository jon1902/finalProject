import React from 'react';
import { Card } from 'antd';
import "./HomeCard.css"

interface IHomeCardProps {
    title: string;
    content: string;
}

export const HomeCard = ({ title, content }: IHomeCardProps) => <Card title={title} className="home-card">
    <div className="cardContent">
        {content}       
    </div>
</Card>
