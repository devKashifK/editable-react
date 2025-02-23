import { Icon } from "@iconify/react/dist/iconify.js";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
                    from-blue-50/30 via-white via-purple-50/20 to-white" />

      {/* Static Mesh Grid */}
      <div className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Main Container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static Circles - Positioned in corners */}
        <div className="absolute top-[5%] right-[5%] w-[300px] h-[300px] rounded-full 
                      border-[1px] border-gray-200/30">
          <div className="absolute inset-0 rounded-full border-[1px] border-gray-200/30" />
          <div className="absolute inset-[20%] rounded-full border-[1px] border-gray-200/30" />
        </div>

        <div className="absolute bottom-[5%] left-[5%] w-[250px] h-[250px] rounded-full 
                      border-[1px] border-gray-200/30">
          <div className="absolute inset-0 rounded-full border-[1px] border-gray-200/30" />
        </div>

        {/* Static Airplane Icons - Larger and more visible */}
        {/* <div className="absolute inset-0">
          <div className="absolute top-[15%] left-[10%] w-12 h-12 text-gray-600/50">
            <Icon icon="mynaui:aeroplane" className="rotate-[30deg] w-full h-full opacity-50" />
          </div>

          <div className="absolute top-[25%] right-[15%] w-16 h-16 text-gray-600/50">
            <Icon icon="mynaui:aeroplane" className="-rotate-[15deg] w-full h-full opacity-50" />
          </div>

        </div> */}

        {/* Gradient Shapes - Positioned around edges */}
        <div className="absolute inset-0">
          {/* Geometric Shapes */}
          <div className="absolute top-[10%] left-[15%] w-32 h-32 border-[1px] border-gray-300/30 rotate-45" />
          <div className="absolute bottom-[15%] right-[20%] w-40 h-40 border-[1px] border-gray-300/30 rotate-12" />

          {/* Static Gradients - More visible and spread out */}
          <div className="absolute top-[5%] left-[5%] w-[400px] h-[400px]
                        bg-gradient-to-br from-blue-500/[0.08] to-transparent rounded-full blur-2xl" />
          
          <div className="absolute top-[20%] right-[5%] w-[350px] h-[350px]
                        bg-gradient-to-tr from-purple-500/[0.08] to-transparent rounded-full blur-2xl" />
          
          <div className="absolute bottom-[5%] right-[10%] w-[380px] h-[380px]
                        bg-gradient-to-bl from-blue-500/[0.08] via-purple-500/[0.05] to-transparent rounded-full blur-2xl" />
          
          <div className="absolute bottom-[15%] left-[10%] w-[320px] h-[320px]
                        bg-gradient-to-tr from-purple-500/[0.08] to-transparent rounded-full blur-2xl" />
        </div>

        {/* Light Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-[10%] w-2 h-[30%] bg-gradient-to-b from-blue-500/[0.1] to-transparent" />
          <div className="absolute top-[10%] right-[20%] w-2 h-[25%] bg-gradient-to-b from-purple-500/[0.1] to-transparent" />

          {/* Static Dots - More visible and spread out */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gray-600/30 rounded-full"
              style={{
                top: `${10 + i * 10}%`,
                left: i % 2 === 0 ? `${5 + i * 12}%` : `${85 - i * 12}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 