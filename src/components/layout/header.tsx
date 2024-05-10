import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 홈으로 이동
  const handleHome = () => {
    navigate('/');
  };

  // 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 모바일 메뉴 닫기
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="w-full h-auto py-5 bg-white border-b border-gray-200">
      <div className="flex justify-between items-center h-auto px-4">
        <div className="flex items-center">
          <div>
            <button onClick={toggleMobileMenu} className="text-xl font-bold mobile:hidden mr-4">
              ☰
            </button>
          </div>
          <div className="flex justify-end items-center mobile:hidden">
            <Button
              onClick={handleHome}
              className="bg-white text-2xl font-bold text-[#ee3918] z-10"
            >
              Testsite
            </Button>
          </div>
        </div>

        <div className="hidden mobile:flex justify-around w-full">
          <div className="flex items-center">
            <Button
              onClick={handleHome}
              className="bg-white text-2xl font-bold text-[#ee3918] z-10"
            >
              Testsite
            </Button>
            <Button onClick={() => {}} className="bg-white text-black text-lg mx-2">
              게시판
            </Button>
            <Button onClick={() => {}} className="bg-white text-black text-lg mx-2">
              대시보드
            </Button>
          </div>
          <div>
            <Button className="text-lg bg-white font-bold text-[#272727] border-[1px] border-[#E1E1E1] mx-2">
              로그인
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-40" onClick={closeMobileMenu}>
          <div className="bg-white h-full w-2/3 p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col font-bold text-black">
              <Button className=" bg-white text-black text-lg my-4">로그인</Button>
              <Button onClick={() => {}} className=" bg-white text-black text-lg my-4">
                게시판
              </Button>
              <Button onClick={() => {}} className=" bg-white text-black text-lg my-4">
                대시보드(모바일 불가)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
