import React from 'react';
import Card from './Card';

interface LinkButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white hover:bg-slate-50 border border-gray-200 hover:border-indigo-400 rounded-lg text-gray-700 hover:text-indigo-600 font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center"
  >
    {icon}
    <span className="text-sm">{label}</span>
  </a>
);

const QuickLinks: React.FC = () => {
  const WeatherIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 9.168A6.002 6.002 0 0110 4a6 6 0 015.668 5.168 3.5 3.5 0 01-3.168 4.832 3.5 3.5 0 01-4.832-3.168 3.502 3.502 0 01-1.336-1.664z" clipRule="evenodd" />
    </svg>
  );
  
  const SchoolIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.394 2.08a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
  );

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4 text-center text-indigo-600">빠른 링크</h2>
      <div className="grid grid-cols-2 gap-3">
        <LinkButton href="https://www.weather.go.kr/w/index.do#dong/4137054300/37.17191095871467/127.0437018522836/%EA%B2%BD%EA%B8%B0%20%EC%98%A4%EC%82%B0%EC%8B%9C%20%EA%B8%88%EC%95%94%EB%8F%99/SCH/%EC%84%B8%EA%B5%90%EB%8D%B0%EC%8B%9C%EC%95%99%ED%8F%AC%EB%A0%88%EC%95%84%ED%8C%8C%ED%8A%B8" icon={<WeatherIcon />} label="집 날씨" />
        <LinkButton href="https://www.weather.go.kr/w/index.do#dong/4139059200/37.339967207647575/126.73394692429751/%EA%B2%BD%EA%B8%B0%20%EC%8B%9C%ED%9D%A5%EC%8B%9C%20%EC%A0%95%EC%99%95%EB%8F%99/SCH/%ED%95%9C%EA%B5%AD%EA%B3%B5%ED%95%99%EB%8C%80%ED%95%99%EA%B5%90" icon={<WeatherIcon />} label="학교 날씨" />
        <LinkButton href="https://eclass.tukorea.ac.kr/ilos/main/main_form.acl" icon={<SchoolIcon />} label="TUK e-Class" />
        <LinkButton href="https://job.kpu.ac.kr/common/user/login.do?rtnUrl=21306aa07dd2f16c34d6c553b2e842ba014b25b816e5523c22ff3f6c59ab3da5" icon={<SchoolIcon />} label="TUK U-CAN+" />
      </div>
    </Card>
  );
};

export default QuickLinks;