import Image from 'next/image';
// import DefaultIcon from '@/public/assets/default-icon.png';

async function TechIcon({ name }) {
  try {
    const res = await fetch(
      `https://icon.icepanel.io/Technology/svg/${name}.svg`,
    );
    console.log(res.ok);

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return (
      <img
        src={`https://icon.icepanel.io/Technology/svg/${name}.svg`}
        alt={name}
        width={32}
        height={32}
      />
    );
  } catch (error) {
    return (
      <img src={`/assets/default.svg`} alt={name} width={32} height={32} />
    );
  }
}

export default function TechStacks({ technologies }) {
  return (
    <>
      <h1 className="min-w-full text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
        Tech Stack
      </h1>
      {technologies?.map((tech, index) => {
        return (
          <div
            key={index}
            className="flex min-w-[33%] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#41474e]"
          >
            <p className="text-white text-base font-medium leading-normal">
              Categories: {tech?.categories?.[0] ? tech.categories[0] : 'N/A'}
            </p>
            <p className="text-white tracking-light text-2xl font-bold leading-tight flex gap-2 items-center">
              <TechIcon name={tech?.name} />
              {tech?.name}
            </p>
            <div className="flex gap-2 flex-wrap">
              {tech?.vulner?.map((vulner, index) => (
                <p
                  key={index}
                  className="text-white bg-red-600 p-2 break-all px-4 rounded-md text-base font-medium leading-normal"
                >
                  {typeof vulner === 'string' ? vulner : null}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
