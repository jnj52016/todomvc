import React from 'react';

export default function QuadrantTable() {
  return (
    <div className="w-full overflow-hidden border-t border-gray-200 pt-4 pb-6">
      <h3 className="text-center text-lg font-medium text-gray-700 mb-3 px-4">艾森豪威尔四象限法则说明</h3>
      <div className="overflow-x-auto px-2">
        <table className="min-w-full bg-white border border-gray-200 text-xs sm:text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-2 sm:px-3 border-b border-r border-gray-200 text-left">象限</th>
              <th className="py-2 px-2 sm:px-3 border-b border-r border-gray-200 text-left">任务属性</th>
              <th className="py-2 px-2 sm:px-3 border-b border-r border-gray-200 text-left">举例</th>
              <th className="py-2 px-2 sm:px-3 border-b border-gray-200 text-left">应对策略</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-red-50">
              <td className="py-2 px-2 sm:px-3 border-b border-r border-gray-200">第一象限<br />(Q1)</td>
              <td className="py-2 px-2 sm:px-3 border-b border-r border-gray-200">紧急且重要</td>
              <td className="py-2 px-2 sm:px-3 border-b border-r border-gray-200">迫在眉睫的工作截止日期、突发的客户危机、家中失火、孩子急病送医</td>
              <td className="py-2 px-2 sm:px-3 border-b border-gray-200">立即处理</td>
            </tr>
            <tr className="bg-orange-50">
              <td className="py-2 px-2 sm:px-3 border-b border-r border-gray-200">第二象限<br />(Q2)</td>
              <td className="py-2 px-2 sm:px-3 border-b border-r border-gray-200">重要但不紧急</td>
              <td className="py-2 px-2 sm:px-3 border-b border-r border-gray-200">制定长期规划、学习新技能、建立人际关系、定期锻炼身体、预防性维护</td>
              <td className="py-2 px-2 sm:px-3 border-b border-gray-200">重点投入，计划执行</td>
            </tr>
            <tr className="bg-green-50">
              <td className="py-2 px-2 sm:px-3 border-b border-r border-gray-200">第三象限<br />(Q3)</td>
              <td className="py-2 px-2 sm:px-3 border-b border-r border-gray-200">紧急但不重要</td>
              <td className="py-2 px-2 sm:px-3 border-b border-r border-gray-200">大部分不请自来的会议、无关紧要的电话/邮件、同事的临时求助</td>
              <td className="py-2 px-2 sm:px-3 border-b border-gray-200">授权他人或减少投入</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-2 px-2 sm:px-3 border-r border-gray-200">第四象限<br />(Q4)</td>
              <td className="py-2 px-2 sm:px-3 border-r border-gray-200">不紧急不重要</td>
              <td className="py-2 px-2 sm:px-3 border-r border-gray-200">漫无目的地刷刷社交媒体、长时间看娱乐节目、闲聊八卦</td>
              <td className="py-2 px-2 sm:px-3 border-gray-200">尽量避免或减少</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button 
          className="text-blue-500 hover:text-blue-700 text-sm underline focus:outline-none"
          onClick={() => {
            const appContainer = document.getElementById('app-container');
            if (appContainer) {
              appContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >
          回到顶部
        </button>
      </div>
    </div>
  );
} 