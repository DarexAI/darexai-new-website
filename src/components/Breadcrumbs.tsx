import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBreadcrumbs } from '../hooks/useSEO';

interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  // Add structured data for breadcrumbs
  useBreadcrumbs(items);

  const allItems = [
    { name: 'Home', href: '/', current: false },
    ...items
  ];

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2" itemScope itemType="https://schema.org/BreadcrumbList">
        {allItems.map((item, index) => (
          <li 
            key={item.href}
            className="flex items-center space-x-2"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
            )}
            
            {item.current ? (
              <span 
                className="text-gray-300 font-medium"
                aria-current="page"
                itemProp="name"
              >
                {index === 0 && <Home className="w-4 h-4 inline mr-1" />}
                {item.name}
              </span>
            ) : (
              <Link
                to={item.href}
                className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                itemProp="item"
              >
                {index === 0 && <Home className="w-4 h-4 mr-1" />}
                <span itemProp="name">{item.name}</span>
              </Link>
            )}
            
            <meta itemProp="position" content={(index + 1).toString()} />
            {!item.current && <link itemProp="item" href={`https://darexai.com${item.href}`} />}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;