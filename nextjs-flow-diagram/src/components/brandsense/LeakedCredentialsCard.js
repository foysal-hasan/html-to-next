const LeakedCredentialsCard = ({ domain, email, password, date }) => {
  return (
    <div>
      <div className="p-4 grid grid-cols-2">
        <div className="flex flex-col gap-1 border-t border-solid border-t-[#3b4854] py-4 pr-2">
          <p className="text-[#9dabb9] text-sm font-normal leading-normal">
            Domain
          </p>
          <p className="text-white text-sm font-normal leading-normal">
            {domain}
          </p>
        </div>

        <div className="flex flex-col gap-1 border-t border-solid border-t-[#3b4854] py-4 pl-2">
          <p className="text-[#9dabb9] text-sm font-normal leading-normal">
            Email
          </p>
          <p className="text-white text-sm font-normal leading-normal">
            {email}
          </p>
        </div>

        <div className="flex flex-col gap-1 border-t border-solid border-t-[#3b4854] py-4 pr-2">
          <p className="text-[#9dabb9] text-sm font-normal leading-normal">
            Password
          </p>
          <p className="text-white text-sm font-normal leading-normal">
            {password}
          </p>
        </div>

        
          <div className="flex flex-col gap-1 border-t border-solid border-t-[#3b4854] py-4 pl-2">
            <p className="text-[#9dabb9] text-sm font-normal leading-normal">
            {date && 'Date'}
            </p>
            <p className="text-white text-sm font-normal leading-normal">
              {date}
            </p>
          </div>
   
      </div>
    </div>
  );
};

export default LeakedCredentialsCard;
