const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      onClick={() => onClick(project)}
      className={`
        relative overflow-hidden rounded-2xl p-6 cursor-pointer
        bg-gradient-to-br ${project.color}
        transform transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-2xl hover:shadow-black/30
        group min-h-[200px] flex flex-col justify-between
      `}
    >
      {/* Project Number Badge */}
      <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-sm">#{project.id}</span>
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="text-xl font-bold text-white mb-2 pr-12">
          {project.title}
        </h3>
        <p className="text-white/80 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Arrow Icon */}
      <div className="flex justify-end mt-4">
        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:translate-x-1">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full"></div>
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full"></div>
    </div>
  );
};

export default ProjectCard;
